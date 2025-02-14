<?php

namespace MobileFrontend\Hooks;

use MobileContext;

/**
 * This is a hook handler interface, see docs/Hooks.md in core.
 * Use the hook name "GetMobileUrl" to register handlers implementing this interface.
 *
 * @stable to implement
 * @ingroup Hooks
 */
interface GetMobileUrlHook {
	/**
	 * @param string|null &$subdomainTokenReplacement
	 * @param MobileContext $context
	 * @return bool|void True or no return value to continue or false to abort
	 */
	public function onGetMobileUrl( ?string &$subdomainTokenReplacement, MobileContext $context );
}
